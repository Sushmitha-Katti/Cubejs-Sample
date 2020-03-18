cube(`Taste`, {
  sql: `SELECT * FROM public.taste`,
  
  joins: {
    Category: {
      relationship: `belongsTo`,
      sql: `${Category}.id = ${Taste}.id`
    },
    Overall: {
      relationship: `belongsTo`,
      sql: `${Overall}.id = ${Taste}.id`
    },
    Sku: {
      relationship: `belongsTo`,
      sql: `${Sku}.id = ${Taste}.id`
    },
    Buckets: {
      relationship: `belongsTo`,
      sql: `${Buckets}.id = ${Taste}.id`
    },
    Texture: {
      relationship: `belongsTo`,
      sql: `${Texture}.id = ${Taste}.id`
    }
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [id]
    }
  },
  
  dimensions: {
    taste: {
      sql: `taste`,
      type: `string`
    },
    
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    }
  }
});
