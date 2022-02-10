import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export class Car extends Model {
  static table = 'cars';

  @field('name')
  name!: string;

  @field('brand')
  brand!: string;

  @field('about')
  about!: string;

  @field('fuel_type')
  fuel_type!: 'gasoline_motor' | 'electric_motor' | 'hybrid_motor';

  @field('period')
  period!: string;

  @field('price')
  price!: number;

  @field('thumbnail')
  thumbnail!: string;
}
