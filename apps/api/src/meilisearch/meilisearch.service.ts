import { HttpService } from '@nestjs/axios'
import { Injectable, OnModuleInit } from '@nestjs/common'
import { MeiliSearch } from 'meilisearch'

@Injectable()
export class MeiliSearchService implements OnModuleInit {
  private client: MeiliSearch

  constructor(private httpService: HttpService) {
    this.client = new MeiliSearch({
      host: 'http://172.105.37.56:7000/',
      apiKey: 'my_master_key', // Replace with your own API key
    })
  }
  async onModuleInit() {
    try {
      await this.client.createIndex('foodItems', { primaryKey: 'id' })
    } catch (error) {
      console.error('Error creating index:', error)
    }
  }

  async addDocuments(indexName = 'foodItems', documents: any[]) {
    const index = await this.client.getIndex(indexName)
    return await index.addDocuments(documents)
  }

  async search(indexName: string, query: string) {
    const index = await this.client.getIndex(indexName)
    return await index.search(query)
  }
}
