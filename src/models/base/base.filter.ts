import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';
import { SortEnum } from 'src/common/enums/sort.enum';

export class BaseFilter {
  @IsInt()
  @Type(() => Number)
  @ApiProperty({
    type: Number,
    description: 'SizePage(Summary of element on page)',
    default: '5',
    required: false,
  })
  sizePage: number;

  @IsInt()
  @Type(() => Number)
  @ApiProperty({
    type: Number,
    description: 'CurrentPage',
    default: '1',
    required: false,
  })
  currentPage: number;

  @ApiProperty({
    enum: SortEnum,
    description: 'Sort Ascending or Descending by ',
    required: false,
    default: SortEnum.ASCENDING,
  })
  sort: SortEnum;
}

export class IPaginate<T> {
  data: T[];

  count: number;

  currentPage: number;

  nextPage: number;

  prevPage: number;

  lastPage: number;
}

export function paginate<T>(
  data: [T[], number],
  page: number,
  limit: number,
): IPaginate<T> {
  const [result, total]: [T[], number] = data;
  const lastPage: number = Math.ceil(total / limit);
  const nextPage: number = page + 1 > lastPage ? null : page + 1;
  const prevPage: number = page - 1 < 1 ? null : page - 1;
  return {
    data: result,
    count: total,
    currentPage: page,
    nextPage: nextPage,
    prevPage: prevPage,
    lastPage: lastPage,
  };
}
