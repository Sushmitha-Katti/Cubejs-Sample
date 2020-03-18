cube(`Texture`, {
  sql: `SELECT * FROM public.texture`,
  
  joins: {
    Category: {
      relationship: `belongsTo`,
      sql: `${Category}.id = ${Texture}.id`
    },
    Overall: {
      relationship: `belongsTo`,
      sql: `${Overall}.id = ${Texture}.id`
    },
    Sku: {
      relationship: `belongsTo`,
      sql: `${Sku}.id = ${Texture}.id`
    },
    Taste: {
      relationship: `belongsTo`,
      sql: `${Taste}.id = ${Texture}.id`
    },
    Buckets: {
      relationship: `belongsTo`,
      sql: `${Buckets}.id = ${Texture}.id`
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
    
    texture: {
      sql: `texture`,
      type: `string`
    }
  }
});
