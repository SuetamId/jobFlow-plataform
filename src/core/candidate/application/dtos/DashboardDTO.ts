import { ApplicationDTO } from './ApplicationDTO';
import { SavedJobDTO } from './SavedJobDTO';

export interface DashboardSummaryDTO {
  totalApplications: number;
  activeApplications: number;
  savedJobs: number;
  profileCompleteness: number;
  recentApplications: ApplicationDTO[];
  recentSavedJobs: SavedJobDTO[];
}
