export class Article{


    _id?:String;
    userId?:String;
    title?:String;
    type?:String;
    description?:String;
    category?:String;
    featured?:[String];
    postDate?:Date;
    tags?:[String];
    published?:Boolean;
    constructor(article) {
        this._id=article._id;
        this.category=article.category;
        this.title=article.title;
    }
}
