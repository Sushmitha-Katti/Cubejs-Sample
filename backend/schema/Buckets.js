cube(`Buckets`, {
  sql: `SELECT * FROM public.buckets`,
  
  joins: {
    Category: {
      relationship: `belongsTo`,
      sql: `${Category}.id = ${Buckets}.id`
    },
    Overall: {
      relationship: `belongsTo`,
      sql: `${Overall}.id = ${Buckets}.id`
    },
    Sku: {
      relationship: `belongsTo`,
      sql: `${Sku}.id = ${Buckets}.id`
    },
    Taste: {
      relationship: `belongsTo`,
      sql: `${Taste}.id = ${Buckets}.id`
    },
    Texture: {
      relationship: `belongsTo`,
      sql: `${Texture}.id = ${Buckets}.id`
    }
  }
    
  ,
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [id]
    }
  },
  
  dimensions: {
    buckets: {
      sql: `buckets`,
      type: `string`
    },
    
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    }
  }
});
