cube(`Volkswagen`, {
  sql: `SELECT * FROM public.volkswagen`,
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [id, city, screenname, country, date, createdat]
    },
    
    favcount: {
      sql: `favcount`,
      type: `sum`
    },
    
    retweetcount: {
      sql: `retweetcount`,
      type: `sum`
    }
  },
  
  dimensions: {
    comments: {
      sql: `comments`,
      type: `string`
    },
    
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    },
    
    link: {
      sql: `link`,
      type: `string`
    },
    
    general: {
      sql: `general`,
      type: `string`
    },
    
    sedaancars: {
      sql: `sedaancars`,
      type: `string`
    },
    
    hatchback: {
      sql: `hatchback`,
      type: `string`
    },
    
    type: {
      sql: `type`,
      type: `string`
    },
    
    content: {
      sql: `content`,
      type: `string`
    },
    
    followers: {
      sql: `followers`,
      type: `string`
    },
    
    note1: {
      sql: `note1`,
      type: `string`
    },
    
    senti: {
      sql: `senti`,
      type: `string`
    },
    
    models: {
      sql: `models`,
      type: `string`
    },
    
    status: {
      sql: `status`,
      type: `string`
    },
    
    city: {
      sql: `city`,
      type: `string`
    },
    
    note2: {
      sql: `note2`,
      type: `string`
    },
    
    verifiedaccount: {
      sql: `verifiedaccount`,
      type: `string`
    },
    
    location: {
      sql: `location`,
      type: `string`
    },
    
    screenname: {
      sql: `screenname`,
      type: `string`
    },
    
    gender: {
      sql: `gender`,
      type: `string`
    },
    
    source: {
      sql: `source`,
      type: `string`
    },
    
    sentiment: {
      sql: `sentiment`,
      type: `string`
    },
    
    empty: {
      sql: `empty`,
      type: `string`
    },
    
    country: {
      sql: `country`,
      type: `string`
    },
    
    date: {
      sql: `date`,
      type: `string`
    },
    
    state: {
      sql: `state`,
      type: `string`
    },
    
    mynote: {
      sql: `mynote`,
      type: `string`
    },
    
    createdat: {
      sql: `createdat`,
      type: `time`
    }
  }
});
