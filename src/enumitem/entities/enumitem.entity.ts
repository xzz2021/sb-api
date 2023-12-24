
import { Column, Entity,  PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Enumitem {

    @PrimaryGeneratedColumn()
    id: string;

    // @ApiProperty()
    @Column({ unique: true })
    enumName: string; 

    @Column({ type: 'longtext'})
    itemJson: string; 

}
