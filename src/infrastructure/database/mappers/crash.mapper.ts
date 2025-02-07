import { Crash } from "../../../domain/entities/crash.entity";
import { CrashOrmEntity } from "../entities/crash.orm-entity";
import { DriverMapper } from "./driver.mapper";
import { MotoMapper } from "./moto.mapper";

export class CrashMapper {
  static toOrmEntity(crash: Crash): CrashOrmEntity {
    const ormCrash = new CrashOrmEntity();
    ormCrash.id = crash.id;
    ormCrash.type = crash.type;
    ormCrash.date = crash.date;
    ormCrash.description = crash.description;
    ormCrash.location = crash.location;
    ormCrash.responsability = crash.responsability;
    ormCrash.consequence = crash.consequence;
    ormCrash.status = crash.status;
    ormCrash.driver = crash.driver
      ? DriverMapper.toOrmEntity(crash.driver)
      : null;
    ormCrash.moto = crash.moto ? MotoMapper.toOrmEntity(crash.moto) : null;
    return ormCrash;
  }

  static toDomainEntity(ormCrash: CrashOrmEntity): Crash {
    return new Crash(
      ormCrash.id,
      ormCrash.type,
      ormCrash.date,
      ormCrash.description,
      ormCrash.location,
      ormCrash.responsability,
      ormCrash.consequence,
      ormCrash.status,
      ormCrash.driver ? DriverMapper.toDomainEntity(ormCrash.driver) : null,
      ormCrash.moto ? MotoMapper.toDomainEntity(ormCrash.moto) : null
    );
  }
}
