import { NextFunction } from 'express';
import { deleteUrl } from '../../utils/cloudinary';
import { WorkerModel } from '../../models';
import { CustomError } from '../../utils/response/custom-error/customError';

export const deleteWorkerService = async (id: string, next: NextFunction): Promise<void | String> => {
  try {
    const existingWorker = await WorkerModel.findById({ _id: id });
    if (!existingWorker) {
      return next(new CustomError(400, 'General', "Worker ID is doesn't exist!"));
    }
    await deleteUrl(existingWorker.imageUrl);
    await WorkerModel.findByIdAndDelete({ _id: id });
    return 'Worker deleted successfully!';
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal server', error.message));
  }
};