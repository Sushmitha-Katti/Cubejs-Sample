cube(`Overall`, {
  sql: `SELECT * FROM public.overall`,
  
  joins: {
    Category: {
      relationship: `belongsTo`,
      sql: `${Category}.id = ${Overall}.id`
    },
    Buckets: {
      relationship: `belongsTo`,
      sql: `${Overall}.id = ${Buckets}.id`
    },
    Sku: {
      relationship: `belongsTo`,
      sql: `${Sku}.id = ${Overall}.id`
    },
    Taste: {
      relationship: `belongsTo`,
      sql: `${Taste}.id = ${Overall}.id`
    },
    Texture: {
      relationship: `belongsTo`,
      sql: `${Texture}.id = ${Overall}.id`
    }
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [id]
    }
  },
  
  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    },
    
    overall: {
      sql: `overall`,
      type: `string`
    }
  }
});
