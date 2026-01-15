import { Recruiter } from '../../domain/entities/Recruiter';
import { RecruiterDTO } from '../dtos/RecruiterDTO';

export class RecruiterMapper {
  static toDTO(recruiter: Recruiter): RecruiterDTO {
    return {
      id: recruiter.id,
      userId: recruiter.userId,
      companyId: recruiter.companyId,
      email: recruiter.email,
      name: recruiter.name,
      avatarUrl: recruiter.avatarUrl,
      phone: recruiter.phone,
      title: recruiter.title,
      linkedinUrl: recruiter.linkedinUrl,
      createdAt: recruiter.createdAt.toISOString(),
    };
  }
}
