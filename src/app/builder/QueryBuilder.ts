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
    const excludeFields = ["searchTerm", "sortBy", "sortOrder", "limit"];
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
    // Handle priceRange
    if (queryObj.priceRange) {
      // Ensure priceRange is a string and split into an array
      if (typeof queryObj.priceRange === "string") {
        const [min, max] = queryObj.priceRange.split(",").map(Number);

        // Explicitly initialize price as an object
        queryObj.price = {} as { $gte?: number; $lte?: number };

        if (!isNaN(min)) {
          (queryObj.price as { $gte?: number }).$gte = min;
        }
        if (!isNaN(max)) {
          (queryObj.price as { $lte?: number }).$lte = max;
        }
      }
      delete queryObj.priceRange; // Clean up after mapping
    }

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }

  sort() {
    const sortBy = (this.query?.sortBy as string) || "createdAt";
    const sortOrder = (this.query?.sortOrder as string) === "asc" ? 1 : -1;
    this.modelQuery = this.modelQuery.sort({ [sortBy]: sortOrder });
    return this;
  }

  paginate() {
    console.log(this.query)
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }
}

export default QueryBuilder;
