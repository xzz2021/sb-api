
import { Column, Entity,  PrimaryGeneratedColumn } from 'typeorm'

// import { UsersRole } from './usersrole.entity';


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
