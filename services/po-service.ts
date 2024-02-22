import { PO } from '@/data/schema';
import { ApiService } from '@/services/api-service';
import { CreatePoType, ImportedPoType } from '@/types/schema/po-schema';

class PoService extends ApiService {
  public async getPoList(): Promise<any> {
    const url = '/pos';
    return this.get(url)
      .then((response) => {
        return response.data as unknown as PO[];
      })
      .catch(this.throwError);
  }

  public async createPo(
    po: CreatePoType,
  ): Promise<CreatePoType> {
    const url = '/pos';

    return this.post(url, po)
      .then(() => po)
      .catch(this.throwError);
  }

  public async createPoBulk(
    pos: ImportedPoType[],
  ): Promise<ImportedPoType[]> {
    const url = '/pos/bulk';
    const result = {
      pos: pos,
    };
    return this.post(url, result)
      .then(() => pos)
      .catch(this.throwError);
  }
}

export const poService = new PoService();