import { getCustomRepository } from "typeorm"
import { SettingsRepository } from "../repositories/SettingsRepository"

type SettingsCreate = {
  chat: boolean
  username: string
}

class SettingsService {

  async create({ chat, username }: SettingsCreate) {
    const settingsRepository = getCustomRepository(SettingsRepository)

    // Select * from settings whre username = "username" limit 1
    const userAlreadyExists = await settingsRepository.findOne({
      username
    })

    if (userAlreadyExists) {
      throw new Error('User already exists!') // Este erro será passado para a camada de cima (controller)
    }

    const settings = settingsRepository.create({
      chat,
      username
    })

    await settingsRepository.save(settings)

    return settings
  }

}

export { SettingsService }