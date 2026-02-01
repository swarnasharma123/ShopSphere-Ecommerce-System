package com.ecommerce1.sb_ecom1.service;

import com.ecommerce1.sb_ecom1.model.User;
import com.ecommerce1.sb_ecom1.payload.AddressDTO;

import java.util.List;

public interface AddressService {
    AddressDTO createAddress(AddressDTO addressDTO, User user);

    List<AddressDTO> getAddresses();

    AddressDTO getAddressesById(Long addressId);

    List<AddressDTO> getUserAddresses(User user);

    AddressDTO updateAddress(Long addressId, AddressDTO addressDTO);

    String deleteAddress(Long addressId);
}
