import { CapService } from '../services/cap.service';

export interface Cap{
    seriesId: Number;
    //capNumber: Number;
    capName: String;
    duration: String;
    file: File;
}