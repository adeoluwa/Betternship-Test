import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

export default class Helper {
  static signToken(payload: any): { token: string } {
    const token = jwt.sign(payload, (<any>process.env).APP_KEY, {
      expiresIn: (<any>process).env.JWT_EXPIRES_IN,
    });
    return { token };
  }

  static verifyToken(payload: any): { token: any } {
    const token = jwt.verify(payload, (<any>process.env).APP_KEY);
    return { token };
  }

  static hash(value: string, saltValue = 10) {
    return bcryptjs.hashSync(value, saltValue);
  }

  static correctPassword(inputPassword: string, userPassword: string) {
    return bcryptjs.compareSync(inputPassword, userPassword);
  }

  static omitProperties(
    obj: Record<string, any>,
    ...propsToOmit: string[]
  ): Record<string, any> {
    const result = { ...obj };
    propsToOmit.forEach((prop) => {
      delete result[prop];
    });
    return result;
  }
}
