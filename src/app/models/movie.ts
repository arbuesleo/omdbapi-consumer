export class Movie{
    title:String;
    image:String;
    selected:Boolean;
    imdb:string;

    year:String;
    runtime:String;
    genre:String;
    director:String;
    plot:String;
    actors:String;
    imdbRating:String;
    metascore:String;
    language:String;


    constructor(title:String, image:String, selected:Boolean, imdb:string){
        this.title = title;
        this.image = image == 'N/A' ? 'assets/no-image.jpg' : image;
        this.selected = selected;
        this.imdb = imdb;
    }
}