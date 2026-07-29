import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';
import { BulkActionDto } from './dto/bulk-action.dto';
import { Public } from '../auth/decorators/public.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { AdminRole } from '@axa/db';

@ApiTags('Products')
@Controller('v1/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get Paginated Product Catalogue' })
  async getProducts(@Query() queryDto: ProductQueryDto) {
    const result = await this.productsService.getProducts(queryDto);
    return {
      success: true,
      message: 'Products retrieved successfully',
      data: result.items,
      meta: result.meta
    };
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get Product Details by ID' })
  async getProductById(@Param('id') id: string) {
    const product = await this.productsService.getProductById(id);
    return {
      success: true,
      message: 'Product retrieved successfully',
      data: product
    };
  }

  @ApiBearerAuth()
  @Roles(AdminRole.ADMIN)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create New Product' })
  async createProduct(@Body() createProductDto: CreateProductDto) {
    const product = await this.productsService.createProduct(createProductDto);
    return {
      success: true,
      message: 'Product created successfully',
      data: product
    };
  }

  @ApiBearerAuth()
  @Roles(AdminRole.ADMIN)
  @Patch(':id')
  @ApiOperation({ summary: 'Update Existing Product' })
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto
  ) {
    const product = await this.productsService.updateProduct(id, updateProductDto);
    return {
      success: true,
      message: 'Product updated successfully',
      data: product
    };
  }

  @ApiBearerAuth()
  @Roles(AdminRole.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Soft Delete Product' })
  async deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }

  @ApiBearerAuth()
  @Roles(AdminRole.ADMIN)
  @Post(':id/duplicate')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Duplicate Product' })
  async duplicateProduct(@Param('id') id: string) {
    const product = await this.productsService.duplicateProduct(id);
    return {
      success: true,
      message: 'Product duplicated successfully',
      data: product
    };
  }

  @ApiBearerAuth()
  @Roles(AdminRole.ADMIN)
  @Post('upload-images')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Upload Image to Cloudinary CDN' })
  async uploadImage(@Body('fileDataUrl') fileDataUrl: string) {
    const result = await this.productsService.uploadProductImage(fileDataUrl);
    return {
      success: true,
      message: 'Image uploaded successfully',
      data: result
    };
  }

  @ApiBearerAuth()
  @Roles(AdminRole.ADMIN)
  @Post('bulk')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Bulk Actions on Products' })
  async bulkActions(@Body() bulkActionDto: BulkActionDto) {
    return this.productsService.bulkActions(bulkActionDto);
  }
}
