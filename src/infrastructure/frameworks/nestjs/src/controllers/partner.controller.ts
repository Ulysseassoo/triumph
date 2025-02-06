import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { PartnerService } from '../services/partner.service';
import { CreatePartnerDto, UpdatePartnerDto } from '../dtos/partner.dto';
import { Partner } from '../../../../../domain/entities/partner.entity';

@Controller('partners')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  @Post()
  async create(@Body() createPartnerDto: CreatePartnerDto): Promise<Partner> {
    return await this.partnerService.createPartner(createPartnerDto.name, createPartnerDto.contact_info);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Partner | null> {
    return await this.partnerService.findPartnerById(id);
  }

  @Get()
  async findAll(): Promise<Partner[]> {
    return await this.partnerService.findAllPartners();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePartnerDto: UpdatePartnerDto): Promise<void> {
    await this.partnerService.updatePartner(id, updatePartnerDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.partnerService.deletePartner(id);
  }
}