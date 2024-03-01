import { ApiService } from '@/services/api-service';
import {
  CreateScoreForm,
  GetScoreResponse,
  UpdateScoreForm,
} from '@/types/schema/score-schema';

class ScoreService extends ApiService {
  public async getScoresByAssignmentId(
    assignmentId: string,
  ): Promise<GetScoreResponse[]> {
    if (assignmentId === '') {
      return [];
    }

    const url = `/assignments/${assignmentId}/scores/`;
    return this.get(url)
      .then((response) => response.data.data as unknown as GetScoreResponse[])
      .catch(this.throwError);
  }

  public async createScore(
    data: CreateScoreForm,
    assignmentId: string,
  ): Promise<CreateScoreForm> {
    const url = '/scores';
    const result = {
      studentScores: [data],
      userId: '01HQE0N3SWK4QEYK7Y24CJETHX', //Todo: get user id from session backend
      assignmentId: assignmentId,
    };
    return this.post(url, result)
      .then(() => data)
      .catch(this.throwError);
  }

  public async updateScore(
    score: UpdateScoreForm,
    id: string,
  ): Promise<UpdateScoreForm> {
    const url = `/scores/${id}`;
    return this.patch(url, score)
      .then(() => score)
      .catch(this.throwError);
  }

  public async deleteScore(id: string) {
    const url = `/scores/${id}`;
    return this.delete(url)
      .then(() => {})
      .catch(this.throwError);
  }
}

export const scoreService = new ScoreService();
