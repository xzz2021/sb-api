import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { ItemreviewService } from './itemreview.service';

@Controller('itemreview')
export class ItemreviewController {
  constructor(private readonly itemreviewService: ItemreviewService) {}


  @Post('add')
  addApply(@Body() applyItem: any, @Req() req: any) {
    const {  nickname  } = req.user;
    const addItem = { applyRemark: applyItem.applyRemark, applicant: nickname, content: applyItem.content}
    return this.itemreviewService.addApply(addItem);
  }

  @Get('allItems')
  getAllItems(@Query() joinQueryParams: {[string: string]: any}) {
    return this.itemreviewService.getAllItems(joinQueryParams);
  }

  @Post('update')
  updateApply(@Body() updateItem1: any, @Req() req: any) {
    const {  nickname  } = req.user;
    const updateItem = { ...updateItem1, reviewer: nickname }
    return this.itemreviewService.updateApply(updateItem);
  }


}
