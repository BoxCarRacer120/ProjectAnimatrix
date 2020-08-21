import { CapService } from '../services/cap.service';

export interface Cap{
    id: String;
    number: Number;
    name: String;
    duration: String;
    file: File;
    author: String;
}