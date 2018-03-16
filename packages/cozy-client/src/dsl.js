// Queries
export class QueryDefinition {
  constructor({
    doctype,
    id,
    selector,
    fields,
    sort,
    includes,
    referenced,
    skip
  }) {
    this.doctype = doctype
    this.id = id
    this.selector = selector
    this.fields = fields
    this.sort = sort
    this.includes = includes
    this.referenced = referenced
    this.skip = skip
  }

  where(selector) {
    return new QueryDefinition({ ...this.toDefinition(), selector })
  }

  select(fields) {
    return new QueryDefinition({ ...this.toDefinition(), fields })
  }

  sortBy(sort) {
    return new QueryDefinition({ ...this.toDefinition(), sort })
  }

  include(includes) {
    return new QueryDefinition({ ...this.toDefinition(), includes })
  }

  offset(skip) {
    return new QueryDefinition({ ...this.toDefinition(), skip })
  }

  referencedBy(document) {
    return new QueryDefinition({ ...this.toDefinition(), referenced: document })
  }

  toDefinition() {
    return {
      doctype: this.doctype,
      id: this.id,
      selector: this.selector,
      fields: this.fields,
      sort: this.sort,
      includes: this.includes,
      referenced: this.referenced,
      skip: this.skip
    }
  }
}

// Mutations
const CREATE_DOCUMENT = 'CREATE_DOCUMENT'
const UPDATE_DOCUMENT = 'UPDATE_DOCUMENT'
const DELETE_DOCUMENT = 'DELETE_DOCUMENT'
const ADD_REFERENCES_TO = 'ADD_REFERENCES_TO'
const UPLOAD_FILE = 'UPLOAD_FILE'

export const createDocument = document => ({
  mutationType: MutationTypes.CREATE_DOCUMENT,
  document
})

export const updateDocument = document => ({
  mutationType: MutationTypes.UPDATE_DOCUMENT,
  document
})

export const deleteDocument = document => ({
  mutationType: MutationTypes.DELETE_DOCUMENT,
  document
})

export const addReferencesTo = (document, referencedDocuments) => ({
  mutationType: MutationTypes.ADD_REFERENCES_TO,
  referencedDocuments,
  document
})

export const uploadFile = (file, dirPath) => ({
  mutationType: MutationTypes.UPLOAD_FILE,
  file,
  dirPath
})

export const getDoctypeFromOperation = operation => {
  if (operation.mutationType) {
    const type = operation.mutationType
    switch (type) {
      case CREATE_DOCUMENT:
        return operation.document._type
      case UPDATE_DOCUMENT:
        return operation.document._type
      case DELETE_DOCUMENT:
        return operation.document._type
      case ADD_REFERENCES_TO:
        throw new Error('Not implemented')
      case UPLOAD_FILE:
        throw new Error('Not implemented')
      default:
        throw new Error(`Unknown mutationType ${type}`)
    }
  } else {
    return operation.doctype
  }
}

export const Mutations = {
  createDocument,
  updateDocument,
  deleteDocument,
  addReferencesTo,
  uploadFile
}

export const MutationTypes = {
  CREATE_DOCUMENT,
  UPDATE_DOCUMENT,
  DELETE_DOCUMENT,
  ADD_REFERENCES_TO,
  UPLOAD_FILE
}
