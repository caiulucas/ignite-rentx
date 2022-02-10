export type CarDTO = {
  id: string;
  brand: string;
  name: string;
  about: string;
  period: string;
  price: number;
  fuel_type: string;
  thumbnail: string;
  accessories: {
    id: string;
    type:
      | 'speed'
      | 'acceleration'
      | 'turning_diameter'
      | 'gasoline_motor'
      | 'electric_motor'
      | 'hybrid_motor'
      | 'exchange'
      | 'seats';
    name: string;
  }[];
  photos: {
    id: string;
    photo: string;
  }[];
};
