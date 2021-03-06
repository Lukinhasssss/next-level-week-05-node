import { getCustomRepository, Repository } from "typeorm"
import { Setting } from "../entities/Setting"
import { SettingsRepository } from "../repositories/SettingsRepository"

type SettingsCreate = {
  chat: boolean
  username: string
}

class SettingsService {
  private settingsRepository: Repository<Setting>

  constructor() {
    this.settingsRepository = getCustomRepository(SettingsRepository)
  }

  async create({ chat, username }: SettingsCreate) {

    // Select * from settings whre username = "username" limit 1
    const userAlreadyExists = await this.settingsRepository.findOne({
      username
    })

    if (userAlreadyExists) {
      throw new Error('User already exists!') // Este erro será passado para a camada de cima (controller)
    }

    const settings = this.settingsRepository.create({
      chat,
      username
    })

    await this.settingsRepository.save(settings)

    return settings

  }

  async findByUsername(username: string) {
    const settings = await this.settingsRepository.findOne({
      username
    })

    return settings
  }

  async update(username: string, chat: boolean) {
    await this.settingsRepository.createQueryBuilder()
      .update(Setting)
      .set({ chat })
      .where("username = :username", { username })
      .execute()
  }

}

export { SettingsService }