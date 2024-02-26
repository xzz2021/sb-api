import { Injectable } from "@nestjs/common";

@Injectable()
export class LogService {
  async getAllLog() {}

  async addLog(newLog) {
    console.log("🚀 ~ LogService ~ addLog ~ newLog:", newLog);
  }
}
