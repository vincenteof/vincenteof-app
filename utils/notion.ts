import { NotionAPI } from "notion-client";
import { Collection, PageBlock } from "notion-types";
import { getDateValue } from "notion-utils";
import dayjs from "dayjs";

const notion = new NotionAPI();

export type DatabaseItem = { id: string } & { [key: string]: any };

export function processDatabaseItem<T>(
  page: PageBlock,
  collection: Collection
): T {
  const item: DatabaseItem = {
    id: page.id,
  };
  if (page.properties === undefined) {
    throw new Error(`missing properties`);
  }
  for (const [key, value] of Object.entries(page.properties)) {
    const propertyName = collection.schema[key].name;
    switch (collection.schema[key].type) {
      case "text":
      case "title":
        item[propertyName] = value[0]?.[0];
        break;
      case "date":
        const formattedDate = getDateValue(value);
        if (formattedDate?.type === "date") {
          const date = dayjs(formattedDate.start_date);
          item[propertyName] = date.format("YYYY/MM/DD");
        }
        break;
      case "checkbox":
        item[propertyName] = value[0]?.[0] === "Yes";
        break;
      case "multi_select":
        item[propertyName] = value[0]?.[0]?.split(",") || [];
        break;
      default:
        console.log(`unsupported schema type: ${collection.schema[key].type}`);
    }
  }
  return item as T;
}

async function getDatabase<T>(databaseId: string) {
  const recordMap = await notion.getPage(databaseId);
  const collection = Object.values(recordMap.collection)[0].value;
  return Object.values(recordMap.block)
    .map((block) => block.value)
    .filter((block): block is PageBlock => block?.type === "page")
    .map((pageBlock: PageBlock) =>
      processDatabaseItem<T>(pageBlock, collection)
    );
}

const getDatabasePage = async <T>(id: string) => {
  const recordMap = await notion.getPage(id);
  const pageBlock = recordMap.block[id].value;
  const collection = Object.values(recordMap.collection)[0].value;
  if (pageBlock.type !== "page") {
    throw new Error();
  }
  return {
    item: processDatabaseItem<T>(pageBlock, collection),
    recordMap,
  };
};

export { notion, getDatabase, getDatabasePage };
