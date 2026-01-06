import { Injectable } from '@nestjs/common';
import { CreateLibraryDto } from './dto/create-library.dto';
import { UpdateLibraryDto } from './dto/update-library.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LibrariesService {
  constructor(private prisma: PrismaService) { }

  create(createLibraryDto: CreateLibraryDto) {
    return this.prisma.library.create({
      data: createLibraryDto,
    });
  }

  findAll() {
    return this.prisma.library.findMany();
  }

  findOne(id: string) {
    return this.prisma.library.findUnique({ where: { id } });
  }

  update(id: string, updateLibraryDto: UpdateLibraryDto) {
    return this.prisma.library.update({
      where: { id },
      data: updateLibraryDto,
    });
  }

  remove(id: string) {
    return this.prisma.library.delete({ where: { id } });
  }
}
