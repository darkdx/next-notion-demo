import { Client } from "@notionhq/client";

const auth = process.env.NOTION_ACCESS_TOKEN;

const database = process.env.NOTION_DATABASE_USER_ID ?? "";

type Users = any;

export default class NotionService {
  client: Client;

  constructor() {
    this.client = new Client({ auth });
  }

  async query(): Promise<{ data: Users[] }> {
    const response = await this.client.databases.query({
      database_id: database,
    });
    const data = response.results.map((item) => NotionService.format(item));
    return {
      data,
    };
  }

  private static format(page: any): Users {
    let data: any = {};

    for (const key in page.properties) {
      switch (page.properties[key].type) {
        case "date":
        case "email":
        case "phone_number":
        case "number":
          data[key] = page.properties[key][page.properties[key].type];
          break;
        case "title":
        case "text":
          data[key] =
            page.properties[key][page.properties[key].type]?.[0]?.text.content;
          break;

        default:
          data[key] = page.properties[key];
          break;
      }
    }

    return data;
  }
}
