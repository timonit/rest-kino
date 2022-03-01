import { UseCaseOptions } from './usecase-options';

export abstract class UseCase {
  /**
   * @description Запуск UseCase'а.
   */
  abstract do(options: UseCaseOptions): any;
}
