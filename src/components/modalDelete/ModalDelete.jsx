import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

const ModalDelete = ({ modalOpen, closeModal, handleDelete }) => (
  <Dialog
    open={modalOpen}
    onClose={closeModal}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">Delete article</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">Are you sure to delete this article?</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={closeModal} autoFocus>
        Отмена
      </Button>
      <Button onClick={handleDelete}>Удалить</Button>
    </DialogActions>
  </Dialog>
)

export default ModalDelete
