import type { BaseEntity } from '../../../shared/infrastructure/base-entity';

export interface GrindCalibrationEntry extends BaseEntity {
  userId: number;
  name: string;
  method: string;
  equipment: string;
  grindNumber: string;
  aperture: number;
  cupVolume: number;
  finalVolume: number;
  
  calibrationDate: string;
  comments: string;
  notes: string;
  sampleImage: string | null;
}