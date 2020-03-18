cube(`Sku`, {
  sql: `SELECT * FROM public.sku`,
  
  joins: {
    Category: {
      relationship: `belongsTo`,
      sql: `${Category}.id = ${Sku}.id`
    },
    Overall: {
      relationship: `belongsTo`,
      sql: `${Overall}.id = ${Sku}.id`
    },
    Buckets: {
      relationship: `belongsTo`,
      sql: `${Buckets}.id = ${Sku}.id`
    },
    Taste: {
      relationship: `belongsTo`,
      sql: `${Taste}.id = ${Sku}.id`
    },
    Texture: {
      relationship: `belongsTo`,
      sql: `${Texture}.id = ${Sku}.id`
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
    
    sku: {
      sql: `sku`,
      type: `string`
    }
  }
});
