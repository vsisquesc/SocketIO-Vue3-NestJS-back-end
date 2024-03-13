import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { QUEUE_NAME, TASK_NAME } from './constants';
import { BadRequestException, Injectable } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';

@Processor(QUEUE_NAME)
@Injectable()
export class AuthQueueProcessor extends WorkerHost {
  constructor(private emailService: EmailService) {
    super();
  }

  async process(job: Job): Promise<boolean> {
    if (job.name === TASK_NAME) {
      const email = job.data.newUser;
      const users = job.data.sendTo;
      return await this.emailService.send(email, users);
    }
    throw new BadRequestException(`Unknown job name: ${job.name}`);
  }
}
