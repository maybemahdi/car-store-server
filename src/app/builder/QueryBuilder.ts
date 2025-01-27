import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = (this.query?.searchTerm as string) || "";
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map((field) => ({
          [field]: { $regex: searchTerm, $options: "i" },
        })),
      });
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.query };
    const excludeFields = ["searchTerm", "sortBy", "sortOrder"];
    // Remove exclude fields and any null or undefined values
    excludeFields.forEach((el) => delete queryObj[el]);
    Object.keys(queryObj).forEach((key) => {
      if (queryObj[key] == null || queryObj[key] === "") {
        delete queryObj[key];
      }
    });
    if (queryObj.availability) {
      queryObj.inStock = queryObj.availability === "inStock";
      delete queryObj["availability"];
    }
    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }

  // sort() {
  //   const sortBy = (this.query?.sortBy as string) || "createdAt";
  //   const sortOrder = (this.query?.sortOrder as string) === "asc" ? 1 : -1;
  //   this.modelQuery = this.modelQuery.sort({ [sortBy]: sortOrder });
  //   return this;
  // }
}

export default QueryBuilder;
