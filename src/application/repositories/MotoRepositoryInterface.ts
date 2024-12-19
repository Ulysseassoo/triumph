import { Moto } from './../../domain/entities/moto.entity';

export interface MotoRepositoryInterface {
    create(moto: Moto): Promise<Moto | null>;
    findById(id: string): Promise<Moto | null>;
    findAll(): Promise<Moto[]>;
    delete(id: string): Promise<void>;
}