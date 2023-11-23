import { DeckMetadataDTO } from 'src/dto/deck-metadata.dto';

export class DeckDTO extends DeckMetadataDTO {
  /**
   * Determine if the requested deck is shuffled.
   * @example true
   */
  isShuffled: boolean;
}
