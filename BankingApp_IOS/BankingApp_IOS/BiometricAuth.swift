//
//  BiometricAuth.swift
//  BankingApp_IOS
//
//  Created by Lucas Hermes on 20.06.24.
//

import Foundation
import LocalAuthentication

class BiometricAuth: ObservableObject {
    
    @Published var isUnLocked: Bool = true
    
    func authenticate () {
        let context = LAContext()
        var error: NSError?
        
        if context.canEvaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, error: &error) {
            
            let reason = "Unlock using Faceid"
            
            context.evaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, localizedReason: reason) { success, authenticationError in
              
                DispatchQueue.main.async {
                    if success {
                        self.isUnLocked = true
                        print("bio success")
                    } else {
                        self.isUnLocked = false
                        print("bio fail")
                    }
                }
            }
        } else {
            DispatchQueue.main.async {
                //self.isUnLocked = true //TODO: only in DEV for preview
                print("no bio")
            }
        }
    }
    
}
