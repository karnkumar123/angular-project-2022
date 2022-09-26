import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class Logger{
    logMessage(msg: string){
        console.log(msg)
    }
}