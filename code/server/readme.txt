 
 npx knex migrate:make brand --knexfile ./database/knexfile.js
 npx knex migrate:latest --knexfile ./database/knexfile.js
 npx knex migrate:rollback --knexfile ./database/knexfile.js
 npx knex seed:make 03_userrole --knexfile ./database/knexfile.js
 npx knex seed:run --knexfile ./database/knexfile.js
  npx knex seed:run --specific=024_report.js --knexfile ./database/knexfile.js
--specific=seed-filename.js
 --debug: Run with debugging
--knexfile [path]: Specify the knexfile path
--knexpath [path]: Specify the path to the knex instance
--cwd [path]: Specify the working directory
--client [name]: Set the DB client
--connection [address]: Set the DB connection
--migrations-table-name: Set the migration table name
--migrations-directory: Set the migrations directory
--env: environment, default: process.env.NODE_ENV || development
--esm: Enables ESM module interoperability
--help: Display help text for a particular command and exit.
 npx knex migrate:make usersocialnetwork --knexfile ./database/knexfile.js

  npx knex migrate:make messageuser --knexfile ./database/knexfile.js


<InputFileMultiple
                type='file'
                accept=".jpg, .jpeg, .png"
                name="filefield"
                onChange={e => setNotDownPic([...notDownPic, ...e.target.files])}
              />
              
  import React from 'react'
import classes from './InputFileMultiple.module.css'
import close from '../../../../img/close.png'
const InputFileMultiple = (type, accept, items, onChange, ...props) => {
  return (
    <div >
      <input
        {...props}
        type={type}
        multiple='multiple'
        accept={accept}
        //  className={classes.inputWithoutCheck} //   setNotDownPic([...picObj])
        onChange={onChange}
      />
      <div className="images">
        <h3>Загруженные фото</h3>
        {items.length > 0
          ? items.map(pic => <div key={pic.lastModified} className={classes.downImages}>
            <h5>{pic.name}</h5>
            <img src={close} className={classes.pic15px15px} />
          </div>)
          : ''}
      </div>
    </div>
  )
}

export default InputFileMultiple




console.log('ASD')
  let examples = [{login: 'user',password:'user'},
  {login: 'admin',password:'admin'},
  {login: 'moderator',password:'moderator'},

  {login: 'milka',password:'moderator'},

  {login: 'BruceWayne',password:'moderator'},

  {login: 'Terminator',password:'moderator'},

  {login: 'Genezis',password:'moderator'},

  {login: 'Nemezida',password:'moderator'},

  {login: 'SunnyBoy',password:'moderator'},

  {login: 'Mark',password:'moderator'},

  {login: 'Gela',password:'moderator'},

  {login: 'Aero',password:'moderator'},

  {login: 'classGolg',password:'moderator'},
  
  {login: 'danceBro2289',password:'moderator'}]
  let examplesHash = []
  for (let i =0;i<examples.length;i++){
    const hashPassword = bcrypt.hashSync(examples[i].password,3)
    examplesHash = [...examplesHash,{...examples, password:hashPassword}]
  }