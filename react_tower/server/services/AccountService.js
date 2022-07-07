import { BadRequest, Forbidden } from '@bcwdev/auth0provider/lib/Errors.js';
import { dbContext } from '../db/DbContext'
import { logger } from '../utils/Logger'

const bcrypt = require("bcrypt");

// Private Methods

function hashPassword(password)
{
    return bcrypt.hashSync(password, 15);
}


/**
 * Restricts changes to the body of the account object
 * @param {any} body
 */
function sanitizeBody(body) {
    const writable = {
        name: body.name,
        picture: body.picture,
        password: hashPassword(body.password)
    }
    return writable
}

class AccountService {
    async createAccount({ email, password })
    {
        const data = { email, password };
        if(await dbContext.Account.findOne({ email }))
        {
            throw new Forbidden("Account with that email already exists.");
        }

        data.password = hashPassword(data.password);
        data.name = data.email;
        data.picture = "https://thiscatdoesnotexist.com/";

        const newUser = await dbContext.Account.create(data);
        return newUser;
    }

    async getAccount({ email, password }) {
        let account = await dbContext.Account.findOne({ email })
        if(!account)
        {
            throw new BadRequest("Account does not exist.");
        }

        const validPassword = bcrypt.compareSync(password, account.password);
        if(!validPassword)
        {
            throw new BadRequest("Incorrect password");
        }

        return account;
    }

  /**
   * Updates account with the request body, will only allow changes to editable fields
   *  @param {any} user Auth0 user object
   *  @param {any} body Updates to apply to user object
   */
  async updateAccount(user, body) {
    const update = sanitizeBody(body)
    const account = await dbContext.Account.findOneAndUpdate(
      { _id: user.id },
      { $set: update },
      { runValidators: true, setDefaultsOnInsert: true, new: true }
    )
    return account
  }
}
export const accountService = new AccountService()
