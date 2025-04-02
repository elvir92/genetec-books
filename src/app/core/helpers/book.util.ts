import { IBook } from '@core/models/book.model';

export class BookUtil {
  static getMockBooks(): IBook[] {
    return [
      {
        id: '1',
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        year: 1925,
        genre: 'Classic',
        description:
          'A story of wealth, love, and the American Dream in the 1920s.',
        coverUrl: 'https://picsum.photos/300/450?random=1',
      },
      {
        id: '2',
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        year: 1960,
        genre: 'Fiction',
        description:
          'A story of racial injustice and moral growth in the American South.',
        coverUrl: 'https://picsum.photos/id/237/200/300',
      },
      {
        id: '3',
        title: '1984',
        author: 'George Orwell',
        year: 1949,
        genre: 'Dystopian',
        description:
          'A dystopian novel set in a totalitarian regime where individualism is persecuted.',
        coverUrl: 'https://picsum.photos/300/450?random=1',
      },
      {
        id: '4',
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        year: 1813,
        genre: 'Romance',
        description:
          'A romantic novel following the character development of Elizabeth Bennet.',
        coverUrl: 'https://picsum.photos/300/450?random=1',
      },
      {
        id: '5',
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        year: 1937,
        genre: 'Fantasy',
        description:
          'A fantasy novel set in Middle-earth, following the quest of Bilbo Baggins.',
        coverUrl: 'https://picsum.photos/300/450?random=1',
      },
    ];
  }

  static generateMockBook(): IBook {
    const genres = [
      'Fiction',
      'Non-Fiction',
      'Fantasy',
      'Sci-Fi',
      'Mystery',
      'Biography',
    ];
    const randomGenre = genres[Math.floor(Math.random() * genres.length)];

    const titles = [
      'Echoes of Tomorrow',
      'Whispers in the Wind',
      'The Last Journey',
      'Beyond the Horizon',
      'Secrets of the Deep',
      'The Forgotten Path',
    ];
    const randomTitle = titles[Math.floor(Math.random() * titles.length)];

    const authors = [
      'E.L. Blackwood',
      'A.J. Morgan',
      'S.R. Reynolds',
      'M.K. Williams',
      'D.T. Harper',
      'J.R. Stevens',
    ];
    const randomAuthor = authors[Math.floor(Math.random() * authors.length)];

    return {
      id: this.generateId(),
      title: randomTitle,
      author: randomAuthor,
      year: 2000 + Math.floor(Math.random() * 23), // Random year between 2000-2023
      genre: randomGenre,
      description: `An engaging ${randomGenre.toLowerCase()} book that captivates readers with its unique storytelling.`,
      coverUrl: `https://picsum.photos/300/450?random=1`,
    };
  }

  static generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }
}
