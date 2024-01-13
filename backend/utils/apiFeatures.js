class ApiFeatures{
    constructor(query,queryStr){
        this.query=query
        this.queryStr=queryStr
    }

    search(){
        let keyword=this.queryStr.keyword?{
            name:{
                $regex:this.queryStr.keyword,
                $options:"i",
            },
        }:{

        }
        this.query = this.query.find({...keyword})
        return this;

    }

    filter(){
        // ab referance nhi mila actual copy created
        let queryCopy = {...this.queryStr}
        // remove some fields for category
        const removeField = ["keyword","page","limit"];
        removeField.forEach(key=>delete queryCopy[key]);

        // filter for price and rating
        let queryStr = JSON.stringify(queryCopy);
        queryCopy = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);
        
        this.query = this.query.find(JSON.parse(queryCopy));
       // console.log(queryCopy);
        return this;
    }

    pagination(resultPerPage){
        const currentPage = Number(this.queryStr.page)|| 1
        const skip = resultPerPage*(currentPage-1);

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }
}

module.exports = ApiFeatures