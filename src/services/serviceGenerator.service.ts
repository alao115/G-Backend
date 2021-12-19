import { Model } from "mongoose";
import { Container, ContainerInstance, Service } from "typedi";

@Service('serviceGenerator')
export default class serviceGenerator<T extends Model<any>> {

  constructor(protected Model: T) { }

  async getAll() {
    try {
      const entities = await this.Model.find({}, { __v: false });
      return entities;
    } catch (error) { throw error; }
  }

  async findByID({ id }: { id: string }) {
    try {
      const entity = await this.Model.findById(id, { __v: false, password: false });
      return entity;
    } catch (error) { throw error; }
  }

  async findOne(condition: object) {
    try {
      const entity = await this.Model.findOne({ ...condition }, { __v: false });
      return entity;
    } catch (error) { throw error; }
  }

  async findByEmail({ email }: { email: string; }) {
    try {
      const entity = await this.Model.findOne({ email } as object, { __v: false });
      return entity;
    } catch (error) { throw error; }
  }

  async create(entityData: any) {
    try {
      const entity = new this.Model({ ...entityData });
      await entity.save();
      return entity;
    } catch (error) { throw error; }
  }

  async update({ id, data }: { id: string; data: object; }) {
    try {
      const isEntityFound = await this.findByID({ id });
      if (!isEntityFound) throw new Error('Data to be updated not found')
      const entity = await this.Model.updateOne({ _id: id } as object, { ...data });
      return entity;
    } catch (error) { throw error; }
  }

  async delete({ id }: { id: string; }) {
    try {
      const entity = await this.findByID({ id });
      if (entity) await entity.deleteOne();
      else throw new Error('Data to be deleted not found')
      return entity;
    } catch (error) { throw error; }
  }
};
// new ContainerInstance('gh').
// Container.set('serviceGenerator', 'entityService')