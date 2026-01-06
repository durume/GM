import { Injectable } from '@nestjs/common';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProgramsService {
  constructor(private prisma: PrismaService) { }

  create(createProgramDto: CreateProgramDto) {
    return this.prisma.program.create({
      data: {
        ...createProgramDto,
        startDate: new Date(createProgramDto.startDate),
        endDate: createProgramDto.endDate ? new Date(createProgramDto.endDate) : null,
      },
    });
  }

  findAll() {
    return this.prisma.program.findMany({
      include: { library: true },
    });
  }

  findOne(id: string) {
    return this.prisma.program.findUnique({
      where: { id },
      include: { library: true },
    });
  }

  update(id: string, updateProgramDto: UpdateProgramDto) {
    const data: any = { ...updateProgramDto };
    if (updateProgramDto.startDate) {
      data.startDate = new Date(updateProgramDto.startDate);
    }
    if (updateProgramDto.endDate) {
      data.endDate = new Date(updateProgramDto.endDate);
    }

    return this.prisma.program.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.program.delete({ where: { id } });
  }
}
