import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    const { id: paramId } = await params;
    const id = parseInt(paramId);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid project ID' },
        { status: 400 }
      );
    }

    const project = await prisma.project.findUnique({
      where: { id: id }
    });

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id: paramId } = await params;
    const id = parseInt(paramId);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid project ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { title, description, imageUrl, projectUrl, githubUrl, technologies } = body;
    // Validate required fields for update (technologies must be non-empty array)
    // Check if project exists first
    const existingProject = await prisma.project.findUnique({ where: { id: id } });
    if (!existingProject) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    if (!title || !description || !Array.isArray(technologies) || technologies.length === 0) {
      return NextResponse.json(
        { error: 'Title, description, and non-empty technologies are required' },
        { status: 400 }
      );
    }
    try {
      const project = await prisma.project.update({
        where: { id: id },
        data: {
          title,
          description,
          imageUrl,
          projectUrl,
          githubUrl,
          technologies
        }
      });
      return NextResponse.json(project, { status: 200 });
    } catch (error) {
      // Prisma error for not found: P2025
      if (error && typeof error === 'object' && error.code === 'P2025') {
        return NextResponse.json({ error: 'Project not found' }, { status: 404 });
      }
      if (error instanceof Error && error.message.includes('Record to update does not exist')) {
        return NextResponse.json({ error: 'Project not found' }, { status: 404 });
      }
      console.error('Error updating project:', error);
      return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id: paramId } = await params;
    const id = parseInt(paramId);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid project ID' },
        { status: 404 }
      );
    }

    try {
      // Try to delete the project
      const deleted = await prisma.project.delete({
        where: { id: id }
      });
      // If delete succeeds, return 200
      return NextResponse.json({ message: 'Project deleted successfully', project: deleted }, { status: 200 });
    } catch (error) {
      console.error('Error deleting project:', error);
      // Prisma error for not found: P2025
      if ((error && typeof error === 'object' && error.code === 'P2025') ||
          (error instanceof Error && error.message.includes('Record to delete does not exist'))) {
        return NextResponse.json({ error: 'Project not found' }, { status: 404 });
      }
      return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}