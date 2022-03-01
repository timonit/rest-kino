type TConstructor = any;
type InitObj = {
  name: string,
};

export class InjectService {
  private static repositories: { [p: string]: TConstructor } = {};

  /**
   * @description Декоратор репозитория. Помечает класс как репозиторий.
   * @param {InitObj} initObj
   * @return {ClassDecorator}
   * @constructor
   */
  static Repository(initObj: InitObj): ClassDecorator {
    const meta = { ...initObj };
    return function (Target: any) {
      if (!meta.name) meta.name = Target.name;
      InjectService.repositories[meta.name] = Target;
    }
  }

  /**
   * @description Возвращает репозиторий по имени
   * @param {string} name
   * @return {any}
   */
  repositoryWithName(name: string): any {
    const Target = InjectService.repositories[name];
    return new Target();
  }
}

export const MyRepository = InjectService.Repository;
