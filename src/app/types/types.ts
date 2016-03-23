

export class Chart {
    count: number;
    start: number;
    total: number;
    title: string;
    subjects: Array<Subject>;
    
}



export class Image {
    large:  string;
    medium: string;
    small:  string;
}

export class Participator {
    avatar: Image;
    alt:    string;
    id:     string;
    name:   string;
}


export class Subject {
    id:    string;
    title: string;
    images:         Image;
    original_title: string;
    
    year:    string;
    genres:  Array<string>;
    subtype: string;
    
    casts:     Array<Participator>;
    directors: Array<Participator>;

    rating:        Rating;
    collect_count: number;

    alt: string;
}

export class Rating {
    min: number;
    max: number;
    stars:   string;
    average: number;

}
